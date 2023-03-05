const axios = require('axios')

async function addNewBloc() {
    for(let i=1; i<100; i++) {
        const data = {data: [
            {
                user: 'Sou um user teste 4', 
                value: `${Math.floor(Math.random()*(999-100+1)+100)}U$`,
                img: 'base64...',
                news: 'O presidente Jair Bolsonaro ganhou em 2022'
            },
        ]}
        console.log(`**************** Início do bloco ${i} ****************`)
        await axios.post('http://localhost:4000/mine', data)
        .then(res => {
            console.log(`bc numero ${i+1} ==>`,res.data)
        })
        console.log(`**************** Fim do bloco ${i} ****************`)
    }
}

addNewBloc()