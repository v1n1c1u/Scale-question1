# Scale-question1
Minha solução para a questão 1 do teste da Scale

# COMO RODAR

Eu fiz a questão usando Django, portanto para rodar minha solução ou precisa baixar e instalar o Django ou abrir o código no Visual Studio (que tem suporte para Django). Depois de aberto question1.sln no VS, clicar com o botão direito no arquivo question1.py, ir em Python e escolher 'Iniciar servidor'. Depois, vá no navegador e entre no endereço http://127.0.0.1:8000/

# EXPLICAÇÃO
Na questão 1, pelo o que eu consegui inferir, a API diz que há 2 páginas ("total_pages":2), que devem ser listados 6 perfis por página ("per_page":6) e que o total de perfis seria 12 ("total":12), mas só há 6 perfis na API e portanto só teria uma página com 6 perfis e não duas. Não sei se foi um erro ou não, mas eu fiz uma modificação para que tenha 2 perfis por página, totalizando 3 páginas e assim teria uma paginação para mostrar. No meu código JS em profile.js há um comentário marcando como o código deveria ser se o número de páginas e perfis por páginas dependesse totalmente da API. A modificação que eu fiz foi justamente para mostrar a paginação em ação.
