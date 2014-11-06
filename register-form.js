function FormReg() {

}

FormReg.prototype.showForm = function(elem) {
	$("#shadow-wrap").addClass("visible");
	$(".wrapper").addClass("visible");
	$("#inp-login").focus();
	this.changeTab(elem);
}

FormReg.prototype.changeTab = function(elem) { // Изменение содержимого формы в зависимости от выбранной вкладки
	if (elem !== undefined) {
		var sibl = $(elem).siblings();
		$("#log button").addClass("active");
		$(sibl).removeClass("active");
		$("#data-form div").stop(false, false).hide();
		$("#" + $(elem).attr("label")).stop(false, false).show();
	} else { //показываем вкладку Регистрация
		$("#log button").addClass("active");
		$("button.btn-log-in").removeClass("active");
		$("#data-form div").stop(false, false).hide();
		$("#" + $("button.btn-sign-up").attr("label")).stop(false, false).show();
	};
}

FormReg.prototype.cleanPassword = function(){
	$("input").filter("[type = 'password']").each(function() {
		$(this).val("");
	});
}

FormReg.prototype.validation = function(elem){
	if (!$(elem).filter("[type = 'email']").val() || !varifEmail($(elem).filter("[type = 'email']").val())) {
		$(elem).filter("[type = 'email']").addClass("invalid");
		return false;
	} else if (!$(elem).filter("[type = 'password']").val() || !varifEnglishNumber($(elem).filter("[type = 'password']").val())) {
		$(elem).filter("[type = 'password']").addClass("invalid");
		return false;
	} else if ($(elem).filter("[type = 'text']").length && (!$(elem).filter("[type = 'text']").val() || !varifEnglishNumber($(elem).filter("[type = 'text']").val()))) {
		$(elem).filter("[type = 'text']").addClass("invalid");
		return false;
	}
	return true;
}

function varifEnglishNumber(area) { //проверка, что бы все символы были либо англ либо цыфры
	var pat = /^[a-zA-Z0-9]+$/i;
	var check = pat.test(area);
	return check;
}

function varifEmail(area) { // email
	var pat = /^([a-z0-9_-]+\.)*[a-z0-9_-]+@[a-z0-9_-]+(\.[a-z0-9_-]+)*\.[a-z]{2,6}$/i;
	var check = pat.test(area);
	return check;
}
	
var formReg = new FormReg();

$(document).ready(function(){ //при готовности документа
	
	$(".btn-login-popup").click(function() { //событие при нажатии на "вход" на сайте
		formReg.showForm($("button.btn-log-in"));
		return false;
	});

	$(".btn-register-popup").click(function() { //событие при нажатии на "регистрация" на сайте
		formReg.showForm();
		return false;
	});
	
	$("#log").click(function(event) { //переключение вкладок  !!!!!!!!!!
		var elem = event.target;
		formReg.changeTab(elem);
		formReg.cleanPassword();
	});
	
	$("form").on("submit", function(event) { //валидация
		return formReg.validation($(event.target).children());
	})
	
	$("input").focus(function(event) { //обнуление валидации на отдельном элементе при нажатии
		$(event.target).removeClass("invalid");
	});

	$("#shadow-wrap").click(function() { //закрытие формы по клику на shadow-wrap
		$(this).removeClass("visible");
		$(".wrapper").removeClass("visible");
	});

	$(".btn-log-in").click(function() {
		setTimeout(function() {
			$("#inp-login").focus();
		}, 50);
	});

	$(".btn-sign-up").click(function() {
		setTimeout(function() {
			$("#inp-name").focus();
		}, 50);
	});
	
});
