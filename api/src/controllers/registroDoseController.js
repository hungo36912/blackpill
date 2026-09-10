import db from '../config/database.js';
import { v4 as uuidv4 } from 'uuid';

// POST /tratamentos/:id/dose
export const confirmarDose = async (req, res) => {
    const id_user = req.user.id;
    const { id } = req.params;
    const { data, horario } = req.body;

    if (!data || !horario) {
        return res.status(400).json({ message: 'Informe data e horario da dose confirmada.' });
    }

    try {
        const [tratamentos] = await db.query(
            'SELECT id_tratamento FROM tratamento WHERE id_tratamento = ? AND fk_usuario_id_user = ?',
            [id, id_user]
        );
        if (tratamentos.length === 0) {
            return res.status(404).json({ message: 'Tratamento não encontrado.' });
        }

        const id_registro = uuidv4();
        await db.query(
            `INSERT INTO registro_dose (id_registro, fk_id_tratamento, data, horario, confirmado_em)
             VALUES (?, ?, ?, ?, NOW())
             ON DUPLICATE KEY UPDATE confirmado_em = NOW()`,
            [id_registro, id, data, horario]
        );

        res.status(201).json({ message: 'Dose confirmada com sucesso.' });
    } catch (err) {
        console.error("ERRO AO CONFIRMAR DOSE:", err);
        res.status(500).json({ message: 'Erro interno ao confirmar dose.' });
    }
};

// GET /tratamentos/agenda?data=YYYY-MM-DD
export const buscarAgendaDoDia = async (req, res) => {
    const id_user = req.user.id;
    const { data } = req.query;

    if (!data) {
        return res.status(400).json({ message: 'Informe a data (YYYY-MM-DD) na query string.' });
    }

    try {
        const [linhas] = await db.query(
            `SELECT
                t.id_tratamento,
                r.nome AS nome_remedio,
                tr.dose,
                ht.horario,
                rd.id_registro IS NOT NULL AS confirmado
             FROM tratamento t
             JOIN tratamento_remedio tr ON tr.fk_tratamento_id = t.id_tratamento
             JOIN remedio r ON r.cd_remedio = tr.fk_remedio_cd_remedio
             JOIN horario_tratamento ht ON ht.fk_id_tratamento = t.id_tratamento
             LEFT JOIN registro_dose rd
               ON rd.fk_id_tratamento = t.id_tratamento
              AND rd.data = ?
              AND rd.horario = ht.horario
             WHERE t.fk_usuario_id_user = ?
               AND t.status_ativo = TRUE
               AND t.data_inicio <= ?
               AND (t.data_fim IS NULL OR t.data_fim >= ?)`,
            [data, id_user, data, data]
        );

        const agora = new Date();
        const hojeStr = agora.toISOString().slice(0, 10);

        const itens = linhas.map((linha) => {
            let status = 'pendente';

            if (linha.confirmado) {
                status = 'tomado';
            } else if (data < hojeStr) {
                status = 'atrasado';
            } else if (data === hojeStr) {
                const [h, m] = linha.horario.split(':').map(Number);
                const horarioDose = new Date(agora);
                horarioDose.setHours(h, m, 0, 0);
                if (agora > horarioDose) status = 'atrasado';
            }

            return {
                id_tratamento: linha.id_tratamento,
                nome_remedio: linha.nome_remedio,
                dose: linha.dose,
                horario: linha.horario,
                status,
            };
        });

        res.json(itens);
    } catch (err) {
        console.error("ERRO AO BUSCAR AGENDA DO DIA:", err);
        res.status(500).json({ message: 'Erro interno ao buscar agenda do dia.' });
    }
};

// GET /tratamentos/calendario?inicio=YYYY-MM-DD&fim=YYYY-MM-DD
export const buscarResumoCalendario = async (req, res) => {
    const id_user = req.user.id;
    const { inicio, fim } = req.query;

    if (!inicio || !fim) {
        return res.status(400).json({ message: 'Informe inicio e fim (YYYY-MM-DD) na query string.' });
    }

    try {
        const [tratamentos] = await db.query(
            `SELECT id_tratamento, data_inicio, data_fim
             FROM tratamento
             WHERE fk_usuario_id_user = ? AND status_ativo = TRUE
               AND data_inicio <= ? AND (data_fim IS NULL OR data_fim >= ?)`,
            [id_user, fim, inicio]
        );

        if (tratamentos.length === 0) {
            return res.json({});
        }

        const ids = tratamentos.map((t) => t.id_tratamento);

        const [horarios] = await db.query(
            `SELECT fk_id_tratamento, horario FROM horario_tratamento WHERE fk_id_tratamento IN (?)`,
            [ids]
        );

        const [confirmados] = await db.query(
            `SELECT fk_id_tratamento, data, horario FROM registro_dose
             WHERE fk_id_tratamento IN (?) AND data BETWEEN ? AND ?`,
            [ids, inicio, fim]
        );

        const confirmadosSet = new Set(
            confirmados.map((c) => `${c.fk_id_tratamento}|${c.data.toISOString().slice(0, 10)}|${c.horario}`)
        );

        const hoje = new Date().toISOString().slice(0, 10);
        const resumo = {};

        for (const t of tratamentos) {
            const horariosDoTratamento = horarios.filter((h) => h.fk_id_tratamento === t.id_tratamento);

            const inicioLoop = new Date(Math.max(new Date(inicio), new Date(t.data_inicio)));
            const fimLoop = new Date(Math.min(new Date(fim), t.data_fim ? new Date(t.data_fim) : new Date(fim)));

            for (let cursor = inicioLoop; cursor <= fimLoop; cursor.setDate(cursor.getDate() + 1)) {
                const diaStr = cursor.toISOString().slice(0, 10);

                if (!resumo[diaStr]) resumo[diaStr] = { com_medicamento: false, atrasado: false };
                resumo[diaStr].com_medicamento = true;

                if (diaStr < hoje) {
                    const faltouAlguma = horariosDoTratamento.some(
                        (h) => !confirmadosSet.has(`${t.id_tratamento}|${diaStr}|${h.horario}`)
                    );
                    if (faltouAlguma) resumo[diaStr].atrasado = true;
                }
            }
        }

        res.json(resumo);
    } catch (err) {
        console.error("ERRO AO BUSCAR RESUMO DO CALENDÁRIO:", err);
        res.status(500).json({ message: 'Erro interno ao buscar resumo do calendário.' });
    }
};