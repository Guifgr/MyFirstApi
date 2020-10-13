const { json } = require("express");
const express = require("express")
const router = express.Router();
var https = require("https");

router.get('/', (req, res) =>{
    res.render('index')
})
router.post('/' , (req, res)=>{
    var userName= req.body.userName;
    userName = userName.replace(/[^a-zA-Z ]/g, "")
    userName = userName.replace(/\s/g, '');
    var options = {

        host:'api.github.com',
        path: '/users/' + userName,
        method: 'GET',
        headers: {'user-agent':'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/81.0.4044.138 Safari/537.36'}
    };
    var request = https.request(options, function(response){
    var body = '';
    response.on('data',function(chunk){
        body+=chunk;
    });
    response.on('end',function(){
        var json = JSON.parse(body);
        console.log(json)
        if(json.message === "API rate limit exceeded for 187.95.168.62. (But here's the good news: Authenticated requests get a higher rate limit. Check out the documentation for more details.)"){
            json={
                login: 'yanandrey',
                id: 43590571,
                node_id: 'MDQ6VXNlcjQzNTkwNTcx',
                avatar_url: 'https://avatars2.githubusercontent.com/u/43590571?v=4',
                gravatar_id: '',
                url: 'https://api.github.com/users/yanandrey',
                html_url: 'https://github.com/yanandrey',
                followers_url: 'https://api.github.com/users/yanandrey/followers',
                following_url: 'https://api.github.com/users/yanandrey/following{/other_user}',
                gists_url: 'https://api.github.com/users/yanandrey/gists{/gist_id}',
                starred_url: 'https://api.github.com/users/yanandrey/starred{/owner}{/repo}',
                subscriptions_url: 'https://api.github.com/users/yanandrey/subscriptions',
                organizations_url: 'https://api.github.com/users/yanandrey/orgs',
                repos_url: 'https://api.github.com/users/yanandrey/repos',
                events_url: 'https://api.github.com/users/yanandrey/events{/privacy}',
                received_events_url: 'https://api.github.com/users/yanandrey/received_events',
                type: 'User',
                site_admin: false,
                name: 'Yan Andrey',
                company: null,
                blog: '',
                location: null,
                email: null,
                hireable: null,
                bio: 'Estudante de Ciência da Computação pela Universidade Tecnológica Federal do Paraná (UTFPR-CM).',
                twitter_username: null,
                public_repos: 4,
                public_gists: 0,
                followers: 4,
                following: 4,
                created_at: '2018-09-25T23:21:41Z',
                updated_at: '2020-09-20T20:35:57Z',
                err: "Infelizmente atingimos o max de request's :( mas deixamos um perfil foda aqui pra você!"
              }
              res.render("response", {json})
        }else if(json.message === 'Not Found'){
            res.render("index", {mensage: "Not found!"})
        }else{
            res.render("response", {json})
        }
        });

    });
    request.on('error', function(e) {
    console.error('and the error is '+e);
    });
    request.end();
})
module.exports = router