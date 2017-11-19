<!DOCTYPE html>
<html lang="es">

<head>
    <meta charset="UTF-8">
    <link href="img/logo2.png" rel="shortcut icon">
    <title>Drive S.O</title>
    <link rel="stylesheet" href="css/font-awesome-4.7.0/css/font-awesome.min.css">
    <link rel="stylesheet" href="css/variables.css">
    <link rel="stylesheet" href="css/master.css">
    <link rel="stylesheet" href="css/subPages.css">
    <link rel="stylesheet" href="css/globales.css">
</head>

<body ng-app="app" ng-controller="mainController">
    <div ng-include="templateUrl"></div>
    <div class="header">
        <div class="banner">
            <div class="banner2"> <img src="img/logo3.png" alt=""> <span class="f40 cCeleste">Drive SO</span><img src="img/logo.png" alt=""> </div>
        </div>
        <header>
            <?php include("abc/header.php") ?>
        </header>
    </div>
    <div class="body">
        <div ng-view class="masterContainer"></div>
    </div>
    <div class="footer">
        <footer>
            <?php include("abc/footer.php") ?>
        </footer>
    </div>
    <!--------------------- Cargar Mapa  ---------------------->
    <script async defer src="https://maps.googleapis.com/maps/api/js?key=AIzaSyCuDi7D9AYlVYnNXTM7JDb-zMwUgz-aW8g" onload="notificarMapaCargado()">
    </script>

    <!-- --------------------------------------- -->
    <script src="js/angular/angular.min.js"></script>
    <script src="js/angular/angular-route.min.js"></script>
    <script src="js/angular/cookies.js"></script>
    <script src="js/scripts.js"></script>
</body>

</html>
