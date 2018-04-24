$(document).ready(function(){
	
	

	$('#chat').slideDown(1500);
	var socket=io();
	$msgDetail={};
	$(document).on('submit','.messageform',()=>{
		if($choices=="private")
		var update="#input"+countshowcurrent;
		else var update="#input";
		$msg=$(update).val();
		//alert($msg);
		$msgDetail={
			Msg:$msg,
			By:$usr,
			To:$chatto
		};
		
		if($msg!=""){
				if($choices=="private")
				{
				socket.emit('New private Message',$msgDetail);		
				}
				else if($choices=="group"){
				socket.emit('New Message',$msgDetail);		
				}}
		$('.input').val('');
		
		  
		//For one to one chat
		//socket.emit('join', $chatto);
		
		return false;
	});

	$('#Privatelabel').click(()=>
	{
		$('#Grouplabel').css({"opacity":"0.6"});	
		$('#Privatelabel').css({"opacity":"1"});	
	});
	$('#Grouplabel').click(()=>
	{
		$('#Grouplabel').css({"opacity":"1"});	
		$('#Privatelabel').css({"opacity":"0.6"});	
	});
	
	$("#Lteacher").click(()=>
	{
		$("#Lpilot").css({"opacity":"0.6"});	
		$("#Ldoctor").css({"opacity":"0.6"});	
		$("#Lsoldier").css({"opacity":"0.6"});	
		$("#Lteacher").css({"opacity":"1"});	
	});
	$("#Lpilot").click(()=>
	{
		$("#Lpilot").css({"opacity":"1"});	
		$("#Ldoctor").css({"opacity":"0.6"});	
		$("#Lsoldier").css({"opacity":"0.6"});	
		$("#Lteacher").css({"opacity":"0.6"});	
	});
	$("#Lsoldier").click(()=>
	{
		$("#Lpilot").css({"opacity":"0.6"});	
		$("#Ldoctor").css({"opacity":"0.6"});	
		$("#Lsoldier").css({"opacity":"1"});	
		$("#Lteacher").css({"opacity":"0.6"});	
	});
	$("#Ldoctor").click(()=>
	{
		$("#Lpilot").css({"opacity":"0.6"});	
		$("#Ldoctor").css({"opacity":"1"});	
		$("#Lsoldier").css({"opacity":"0.6"});	
		$("#Lteacher").css({"opacity":"0.6"});	
	});
	
	$('.choiceform').submit(()=>{
		
		$choices=$('input[name=chatchoice]:checked').val();

		$('#chatSection').fadeIn(1000);
		$('.choice').fadeOut(0);
		

		$('input[name=chatchoice]:checked').val('');
		
		
		if($choices=="group"){
			
		var groupchatareahtml=`<div  class="chatroom " >
					<div class="chattinghead" >
						<h4>Chat Messages</h4>
					</div>
					<div class="chatbody" ng-app="myApp" ng-controller="message">				
					<div class="chats chatmessages" >
				
					</div>	
					
					<div class="writebuzz">
					<form class="messageform" action="">
					<textarea rows="3" cols="40" class="input" id="input" placeholder="Write Message" ng-model="message1"></textarea>
					
					<button type="submit" name="send" class="btn-primary input btn-lg" ng-click="display(message1)" style="width: 10%;float:right;border-radius: 60px;color: #9C27B0;background-color: transparent;margin-right: 3%">
					<i class="material-icons" style="font-size: 6vh">send</i>
					</button>
					</form>
					</div>

					</div>
					</div>`;	
		$('#chatarea').html(groupchatareahtml);

		}
		return false;

	});

	$('.UserForm').submit(()=>{
		$('.choice').fadeIn(1000);
		$('#menu').fadeIn(1000);
		$('.User').fadeOut(0);

		$usr=$('[name=username').val();
		$pwd=$('[name=password').val();
		$chathead=$('input[name=chathead]:checked').val();

		$('[name=username').val('');
		$('[name=password').val('');
		$('input[name=chathead]').prop('checked', false);
		var usrde=`<img src="images/`+$chathead+`.png" class="" style="width:40px"> `+$usr;
		$('#username').html(usrde);

		$usrDetails={
			Name:$usr,
			Chathead:$chathead,
			password:$pwd
		};
		users.add($usr);
		socket.emit('user',$usrDetails);
		return false;
	});
	var countshow=0;
	var count=0;
	var users=new Set();
	socket.on('New Users',(data)=>{
		var html='';
		var chatareahtml='';
		for(i=0;i<data.length;i++)
		{	

			if(data[i].Name!=$usr || data[i].password != $pwd)
			{	
				users.add(data[i].Name);
			//To do:Need to pass $chathead and fetch from server.
			countshow=countshow+1;
			count=count+1;
			html+= `<li class="buzzon" id='`+ count +`' onclick="chatwith('`+ count +`','`+data[i].Name+`','`+data[i].Chathead+`','`+countshow+`'); private();">
						 <img src="images/`+data[i].Chathead+`.png" id="chatwith1" style="width:40px"> `+data[i].Name+`
					</li>`;

			
			chatareahtml+=`<div  class="chatroom hide" id='co`+countshow+`' >
					<div class="chattinghead" >
						<img src="images/`+data[i].Chathead+`.png" class="" style="width:40px"> `+data[i].Name+`
					</div>
					<div class="chatbody" ng-app="myApp" ng-controller="message">				
					<div class="chats chat`+data[i].Name+` " id='chat`+countshow+`'>
				
					</div>	
					
					<div class="writebuzz">
					<form class="messageform" action="">
					<textarea rows="3" cols="40" class="input" id="input`+countshow+`" placeholder="Write Message" ng-model="message1"></textarea>
					
					<button type="submit" name="send" class="btn-primary input btn-lg" ng-click="display(message1)" style="width: 10%;float:right;border-radius: 60px;color: #9C27B0;background-color: transparent;margin-right: 3%">
					<i class="material-icons" style="font-size: 6vh">send</i>
					</button>
					</form>
					</div>

					</div>
					</div>`;
			
			if(html!='')		
			$(".nonea").fadeOut(0);
			else $(".nonea").fadeIn(0);	
			}

		}
		$('#activeUsers').html(html);
		if($choices=="private")
		$('#chatarea').html(chatareahtml);
	
		
	});
	
	socket.on('chat message', function(msg){
		//alert notification
		if($choices=="private"){
				var chatid="#chat"+countshowcurrent;
				var chatidto=".chat"+msg.By;
			}
		else {
				var chatid=".chatmessages";
				var chatidto=".chatmessages";
		}
		//alert(chatidto);
		

	if(msg.By==$usr)	
    {
	$(`<div ng-repeat="message in messages" class="message" >
		<span style="position: absolute;left:95%;top:0px;width: 0; height: 0; border-top: 4vh solid #0288D1; border-right: 4vh solid transparent;"></span>
		<span style="margin-left:0px;color:black;display:inline-block!important">`+msg.By+`</span>
		<br>
		<p style="white-space: pre-wrap;word-wrap: break-word;color:white">`+msg.Msg+`</p>
		</div>`).appendTo(chatid);
	}
	else {
	$(`<div ng-repeat="message in messages" class="messager" >
		<span style="position: absolute;left:-10%;top:0px;width: 0; height: 0; border-top: 4vh solid #00E676; border-left: 4vh solid transparent;"></span>
		<span style="margin-left:0px;color:black">`+msg.By+`</span>
		<br>
		<p style="white-space: pre-wrap;word-wrap: break-word;color:white;display:inline-block!important">`+msg.Msg+`</p>
		</div>`).appendTo(chatidto);
		
	}
	$(".chats").animate({"scrollTop": $(".chats")[0].scrollHeight}, "fast");

		
    });

	
	chatwith=function(here,name,img,showthis){
	$chatto=name;
	socket.emit('join', name)
	countshowcurrent=showthis;
	if($choices=="private")
	{
		
	for(var j=0;j<=countshow;j++)
	{ var findshow="#co"+j;
		if(j==showthis)
		{
			$(findshow).fadeIn(1000);
			$(findshow).removeClass("hide");
			
		}
		else {
			
			$(findshow).addClass("hide");
		}
	}
	}
	
	
	$(".chatroom").fadeIn(1000);
	$(".temp").fadeOut(0);
	
	
	for(var i=0;i<=count;i++)
	{
	var find="#"+i;
	if(i==here)	
	{
	$(find).removeClass("buzzon");
	$(find).addClass("buzzactive");
	}
	else{
	$(find).addClass("buzzon");
	$(find).removeClass("buzzactive");
	}
	}

	}


});
$chatto="";
var i=0;

	
 