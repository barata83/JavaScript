import jwt from 'jsonwebtoken';

export function authMiddleware(req: any, res: any, next: any) {
  const authHeader = req.headers.authorization;

  console.log('HEADER:', authHeader);

  if (!authHeader) {
    return res.status(401).json({
      mensagem: 'Token não fornecido',
    });
  }

  const token = authHeader.split(' ')[1];

  console.log('TOKEN RECEBIDO:', token);

  try {
    const decoded = jwt.verify(token, 'segredo-super');

    console.log('TOKEN VÁLIDO:', decoded);

    next();
  } catch (erro) {
    console.log('ERRO JWT:', erro);

    return res.status(401).json({
      mensagem: 'Token inválido',
    });
  }
}
