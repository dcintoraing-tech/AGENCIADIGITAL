/** Curvas y ajustes de movimiento del estudio. Todo el sitio sale de aqui. */
export const ease = {
  out: [0.22, 1, 0.36, 1],
  inOut: [0.76, 0, 0.24, 1],
} as const;

/** Disparo de las apariciones al hacer scroll: una sola vez, al 25 % visible. */
export const vistaUnaVez = { once: true, amount: 0.25 } as const;
