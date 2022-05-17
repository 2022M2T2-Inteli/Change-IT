$servidor = "placeholder";
$usuario = "placeholder";
$senha = "placeholder";
$dbname = "placeholder";

$connect = mysqli_connect($servidor, $usuario, $senha, $dbname);
if (isset($_POST['cadastrar'])) {
    $Nome = $_POST['nome'];

    $Usuário = $_POST['usuario'];

    $Email = $_POST['email'];

    $senha = $_POST['senha'];

    $csenha = $_POST['csenha'];

    $verify = mysqli_query($connect, "SELECT * FROM cadastro WHERE email = '{$Email}'");

    $verifyn = mysqli_query($connect, "SELECT * FROM cadastro WHERE usuario = '{$Usuário}'");

    if (strlen($Nome) < 2) {
        echo "<h2>
        Nome inválido!
            <
            /h2>";
    }
    elseif(strlen($Usuário) < 2) {
        echo "<h2>
        Usuário inválido!
            <
            /h2>";
    }
    elseif(strlen($Email) < 10) {
        echo "<h2>
        Email inválido!
            <
            /h2>";
    }
    elseif(strlen($senha) < 8) {
        echo "<h2>
        Senha inválida!
            <
            /h2>";
    }
    elseif($csenha != $senha) {
        echo "<h2>
        Senhas distintas!
            <
            /h2>";
    }
    elseif(mysqli_num_rows($verify) > 0) {
        echo "<h2>
        Email já registrado!
            <
            /h2>";
    }
    elseif(mysqli_num_rows($verifyn) > 0) {
        echo "<h2>
        Usuário já existente!
            <
            /h2>";
    }
    else {
        $insers = mysqli_query($connect, "INSERT INTO cadastro(nome, usuario, email, senha) VALUES('$Nome', '$Usuário', '$Email', MD5'$senha')");
        if ($insers) {
            echo "<h2>
            Cadastrado com êxito, bem vindo!
                <
                /h2>"; 
        } else {
            echo "Erro";
        }
    }


}