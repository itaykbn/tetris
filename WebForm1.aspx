<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="WebForm1.aspx.cs" Inherits="tettrisV1.WebForm1" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <link rel="stylesheet" type="text/css" href="StyleSheet1.css" />
    <script src="JavaScript.js"></script>
    <script src="draw.js"></script>
    <title>Tettris</title></head>
<body onload="init()">
    <p > score: <span id="score">0</span> </p>
    <br />
    <br />
        <table id ="grid"> </table>
</body>
</html>
