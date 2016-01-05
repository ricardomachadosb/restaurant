module.exports = function(app){
	var orderStatusCodeNew = 1;
	var orderStatusCodeInProgress = 2;
	var orderStatusCodeClosed = 3;
	var orderStatusCodePayed = 4;

	return {
		orderStatusCodeNew: orderStatusCodeNew,
		orderStatusCodeInProgress: orderStatusCodeInProgress,
		orderStatusCodeClosed: orderStatusCodeClosed,
		orderStatusCodePayed: orderStatusCodePayed
	}
}
