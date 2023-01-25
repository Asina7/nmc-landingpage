<?php header('Access-Control-Allow-Origin: *');
if($_SERVER['REQUEST_METHOD'] == 'POST')
{
    $err='';

    $servername = "50.87.150.32";
    $username = "sajinair_beam_us";
    $password = "yFmA7m*yG-yT";
    $dbname = "sajinair_beam";

// Create connection
    $conn = new mysqli($servername, $username, $password, $dbname);
// Check connection
    if ($conn->connect_error) {
        die("Connection failed: " . $conn->connect_error);
    }

    $errors		= array();
   $varFName=trim($_POST["fname"]);
	$varLName=trim($_POST["lname"]);
	$varEmail=trim($_POST["email"]);
	$varPhone=trim($_POST["phone"]);
    $varCountry=trim($_POST["country"]);
    $varCompany=trim($_POST["company"]);
    $varPosition=trim($_POST["position"]);
    $varMessage=trim($_POST["message"]);
    $varService=trim($_POST["services"]);


	$varPage=trim($_POST["page"]);

	if(isset($_POST["source"]))
		$varSource=trim($_POST["source"]);
	else
		$varSource='';

	if(isset($_POST["campaign"]))
		$varCampaign=trim($_POST["campaign"]);
	else
		$varCampaign='';

	if(isset($_POST["medium"]))
		$varMedium=trim($_POST["medium"]);
	else
		$varMedium='';

	if(isset($_POST["term"]))
		$varTerm=trim($_POST["term"]);
	else
		$varTerm='';
    $redPage='Success';
   
    if($varEmail!='')
    {
        $MSQry = "SELECT email FROM manipalScrum WHERE email='".$varEmail."'";
        $result =$conn -> query($MSQry);
        $row = $result->fetch_row();
        $email   = $row[0];
        if($email==$varEmail)
        {
            $err='yes';
            $errors['email'] = (' Email already registered.');
            echo 'E-already';
            return false;
        }
    }
    if($err!='yes')
    {
        if($varPhone!='')
        {
            $MSQry1 = "SELECT phone FROM manipalScrum WHERE phone='".$varPhone."'";
            $result1 = $conn -> query($MSQry1);
            $row1 = $result1->fetch_row();
            $phone   = $row1[0];
            if($phone==$varPhone)
            {
                $errors['phone'] = (' Phone already registered.');
                echo 'P-already';
                return false;
            }
        }
    }
    if ( 0 == count($errors))
    {

        $toMain="saiyed.mehdi@wisoftsolutions.com";
        // $subject = 'Certified ScrumMaster Training Workshop - ';
        $subject = 'NMC ';
        $tz = 'Asia/Dubai';
        $timestamp = time();
        $dt = new DateTime("now", new DateTimeZone($tz));
        $dt->setTimestamp($timestamp);
        $DateTime = $dt->format('Y-m-d H:i:s');
        $mailHeaders = "MIME-Version: 1.0" . "\r\n";
        $mailHeaders .= "Content-type:text/html;charset=UTF-8" . "\r\n";
        $mailHeaders .= "From: Certified ScrumMaster Training Workshop  <noreply@wisoftsolutions.com>\r\n";
		//$mailHeaders .= "bcc: uzair.iqbal@wisoftsolutions.com\r\n";
        $mailHeaders .= "Message-ID: <contact@wisoftsolutions.com>\r\n";
        $mailHeaders .= 'X-Mailer: PHP/' . phpversion();
        	$mailMessage='<BR>First Name: '.$varFName.'<BR>Last Name: '.$var.'<BR>Email: '.$varEmail.'<BR>Phone: '.$varPhone.'<BR>Company: '.$varCompany.'<BR>Country: '.$varCountry. '<BR>Position: '.$Position.'<BR>Service:'.$Service.;

        if(@mail($toMain, $subject.$DateTime, $mailMessage, $mailHeaders,"-fcontact@wisoftsolutions.com"))
        {

            echo $redPage;

            if (!empty($_SERVER['HTTP_CLIENT_IP']))
            {
                $ip=$_SERVER['HTTP_CLIENT_IP'];
            }
            elseif (!empty($_SERVER['HTTP_X_FORWARDED_FOR']))
            {
                $ip=$_SERVER['HTTP_X_FORWARDED_FOR'];
            }
            else
            {
                $ip=$_SERVER['REMOTE_ADDR'];
            }

             $sql = "INSERT INTO manipalScrum (firstname,lastname,email,phone,country,position,company,services,ipaddress,page,source,cdate,campaign,medium,term)
			 VALUES ('".addslashes($varFName)."', '".addslashes($varLName)."', '".$varEmail."', '".$varPhone."','".$varCountry."', '".$ip."', '".$varPage."','".$varSource."','".$DateTime."','".$varCampaign."','".$varMedium."','".$varTerm."','".$varCompany."','".$varPosition."','".$varService."')";
            $result =$conn -> query($sql);
            mysqli_close($conn);
            return true;
        } else {
            echo 'error';
            return false;
        }


    }
}
?>