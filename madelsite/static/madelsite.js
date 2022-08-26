function run_command(command) {
    $("#term").append(`<label style="color: var(--font-color);">guest@madeline:~# ${command}</label>\n`);

    if (command == "about") {
        $("#term").append(`
Hello and welcome to my personal developer site. I figured I would eventually have to at least put something here. I hope you like this site because it took a lot of work. Why not shoot me an email explaining how in the world you ended up here, because... well... how did you end up here??

I am mainly a Python developer, but I study and have hobbies in the majority of computer science areas

I mostly work on personal projects but have done freelance work in the past, and am usually up for hire. If you want to talk to me you can usually contact me on Discord at coconatsu#4342, or shoot an email to <a href="mailto: qwertytrogi@gmail.com">qwertytrogi@gmail.com</a>

/*---------------------------*/

If you have spare gold feel free to send it to
- BTC: bc1qkqy5tqdahdn70tnm42gs6qmq0hg7x5xvr87f94
- ETH: 0x75FE644Df34A95b3C5E03767AeAEe80d7B1B6ce7

`);
    }

    else if (command == "contact") {
        $("#term").append(`
Feel free to contact me for any reason:

 * Email: <a href="mailto: qwertytrogi@gmail.com">qwertytrogi@gmail.com</a>
 * Discord: <a href="https://discord.gg/JF3kg77">https://discord.gg/JF3kg77</a>
 * Github: <a href="https://github.com/qwertyquerty">https://github.com/qwertyquerty</a>
 * Reddit: <a href="https://www.reddit.com/u/qwerty_trogi">https://www.reddit.com/u/qwerty_trogi</a>

`);      
    }

    else if (command == "ls") {
        $("#term").append(`
Redirecting...

`);
        window.location = "http://static.qtqt.cf/";
    }

    $('#term').scrollTop($('#term')[0].scrollHeight);
}