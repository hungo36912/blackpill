import db from '../config/database.js';
import { v4 as uuidv4 } from 'uuid';

const FREQUENCIAS_VALIDAS = ['Todos os dias', 'Dias específicos', 'Uma vez'];

function validarLembrete(body) {
    const { medicamento, horario, frequencia, dias_semana, data_unica } = body;

    if (!medicamento || !medicamento.trim()) {
        return 'Informe o nome do medicamento.';
    }
    if (!horario || !/^\d{2}:\d{2}$/.test(horario)) {
        return 'Informe um horário válido (HH:MM).';
    }
    if (!FREQUENCIAS_VALIDAS.includes(frequencia)) {
        return 'Frequência inválida.';
    }
    if (frequencia === 'Dias específicos' && (!Array.isArray(dias_semana) || dias_semana.length === 0)) {
        return 'Selecione ao menos um dia da semana.';
    }
    if (frequencia === 'Uma vez' && !data_unica) {
        return 'Informe a data do lembrete.';
    }
    return null;
}

// POST /lembretes
export const criarLembrete = async (req, res) => {
    try {
        const id_user = req.user.id;
        const { medicamento, horario, frequencia, dias_semana, data_unica, notificacao } = req.body;

        const erro = validarLembrete(req.body);
        if (erro) {
            return res.status(400).json({ message: erro });
        }

        const id_lembrete = uuidv4();

        await db.query(
            `INSERT INTO lembrete (id_lembrete, fk_usuario_id_user, medicamento, horario, frequencia, dias_semana, data_unica, notificacao)
             VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
            [
                id_lembrete,
                id_user,
                medicamento.trim(),
                horario,
                frequencia,
                frequencia === 'Dias específicos' ? JSON.stringify(dias_semana) : null,
                frequencia === 'Uma vez' ? data_unica : null,
                notificacao ?? true,
            ]
        );

        res.status(201).json({ message: 'Lembrete criado com sucesso.', id_lembrete });
    } catch (err) {
        console.error("ERRO AO CRIAR LEMBRETE:", err);
        res.status(500).json({ message: 'Erro interno ao criar lembrete.' });
    }
};

// GET /lembretes
export const listarLembretes = async (req, res) => {
    try {
        const id_user = req.user.id;

        const [linhas] = await db.query(
            `SELECT
                id_lembrete,
                medicamento,
                TIME_FORMAT(horario, '%H:%i') AS horario,
                frequencia,
                dias_semana,
                DATE_FORMAT(data_unica, '%Y-%m-%d') AS data_unica,
                notificacao
             FROM lembrete
             WHERE fk_usuario_id_user = ?
             ORDER BY horario ASC`,
            [id_user]
        );

        const lembretes = linhas.map((l) => ({
            ...l,
            dias_semana: l.dias_semana ? JSON.parse(l.dias_semana) : [],
            notificacao: Boolean(l.notificacao),
        }));

        res.json(lembretes);
    } catch (err) {
        console.error("ERRO AO LISTAR LEMBRETES:", err);
        res.status(500).json({ message: 'Erro interno ao buscar lembretes.' });
    }
};

// GET /lembretes/hoje

export const listarLembretesHoje = async (req, res) => {
    try {
        const id_user = req.user.id;

        const [linhas] = await db.query(
            `SELECT
                id_lembrete,
                medicamento,
                TIME_FORMAT(horario, '%H:%i') AS horario,
                frequencia,
                dias_semana,
                DATE_FORMAT(data_unica, '%Y-%m-%d') AS data_unica,
                notificacao
             FROM lembrete
             WHERE fk_usuario_id_user = ?
             ORDER BY horario ASC`,
            [id_user]
        );

        const hoje = new Date();

        // Segunda = 0 ... Domingo = 6
        const diaHoje = (hoje.getDay() + 6) % 7;

        const dataHoje =
            `${hoje.getFullYear()}-` +
            `${String(hoje.getMonth() + 1).padStart(2, '0')}-` +
            `${String(hoje.getDate()).padStart(2, '0')}`;

        const lembretes = linhas
            .filter((l) => {

                // Todos os dias
                if (l.frequencia === "Todos os dias") {
                    return true;
                }

                // Uma única data
                if (l.frequencia === "Uma vez") {
                    return l.data_unica === dataHoje;
                }

                // Dias específicos da semana
                if (l.frequencia === "Dias específicos") {
                    const dias = l.dias_semana
                        ? JSON.parse(l.dias_semana)
                        : [];

                    return dias.includes(diaHoje);
                }

                return false;
            })
            .map((l) => ({
                ...l,
                dias_semana: l.dias_semana
                    ? JSON.parse(l.dias_semana)
                    : [],
                notificacao: Boolean(l.notificacao),
            }));

        res.json(lembretes);

    } catch (err) {
        console.error("ERRO AO LISTAR LEMBRETES:", err);

        res.status(500).json({
            message: "Erro interno ao buscar lembretes de hoje."
        });
    }
};

// PUT /lembretes/:id
export const atualizarLembrete = async (req, res) => {
    try {
        const id_user = req.user.id;
        const { id } = req.params;
        const { medicamento, horario, frequencia, dias_semana, data_unica, notificacao } = req.body;

        const erro = validarLembrete(req.body);
        if (erro) {
            return res.status(400).json({ message: erro });
        }

        const [result] = await db.query(
            `UPDATE lembrete
             SET medicamento = ?, horario = ?, frequencia = ?, dias_semana = ?, data_unica = ?, notificacao = ?
             WHERE id_lembrete = ? AND fk_usuario_id_user = ?`,
            [
                medicamento.trim(),
                horario,
                frequencia,
                frequencia === 'Dias específicos' ? JSON.stringify(dias_semana) : null,
                frequencia === 'Uma vez' ? data_unica : null,
                notificacao ?? true,
                id,
                id_user,
            ]
        );

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Lembrete não encontrado.' });
        }

        res.json({ message: 'Lembrete atualizado com sucesso.' });
    } catch (err) {
        console.error("ERRO AO ATUALIZAR LEMBRETE:", err);
        res.status(500).json({ message: 'Erro interno ao atualizar lembrete.' });
    }
};

// DELETE /lembretes/:id
export const deletarLembrete = async (req, res) => {
    try {
        const id_user = req.user.id;
        const { id } = req.params;

        const [result] = await db.query(
            'DELETE FROM lembrete WHERE id_lembrete = ? AND fk_usuario_id_user = ?',
            [id, id_user]
        );

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Lembrete não encontrado.' });
        }

        res.json({ message: 'Lembrete removido com sucesso.' });
    } catch (err) {
        console.error("ERRO AO DELETAR LEMBRETE:", err);
        res.status(500).json({ message: 'Erro interno ao remover lembrete.' });
    }
};