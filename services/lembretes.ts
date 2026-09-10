export type Lembrete = {
  id_lembrete: string;
  medicamento: string;
  horario: string;
  frequencia: string;
  dias_semana: number[];
  data_unica: string | null; // formato "YYYY-MM-DD", ou null se não for "Uma vez"
  notificacao: boolean;
};

export function dataParaApi(data: Date | null): string | null {
  if (!data) return null;

  const ano = data.getFullYear();
  const mes = String(data.getMonth() + 1).padStart(2, "0");
  const dia = String(data.getDate()).padStart(2, "0");

  return `${ano}-${mes}-${dia}`;
}