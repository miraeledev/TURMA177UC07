import jwt from "jsonwebtoken";

//Função middleware para proteger rotas
export function autenticarToken(req, res, next) {
//Pegar o header Autorization (formato esperado: "Bearer <token>")
    const authHeader = req.headers['authorization'];
    //Extrair o token do header (removendo o "Bearer ")
    const token = authHeader && authHeader.split(" ")[1];
    //Se não houver token, retornar 401 (não autorizado)
    if (!token) {
        return res.status(401).json({ msg: "Acesso negado. Token não fornecido." });
    }
    try {
        //Verificar o token é válido
        const usuario = jwt.verify(token, process.env.JWT_SECRET);
        //Adicionar os dados do usuário na requisição
        req.usuario = usuario;
        //Chamar o próximo middleware ou rota
        next();

} catch (error) {
        //Se o token for inválido ou expirado, retornar 403 (proibido)
        return res.status(403).json({ msg: "Erro interno na autorização.", error: error.message });
}};