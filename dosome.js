module.exports =function(mongoose) {
var Cat = mongoose.model('cat',{name:String ,age:Number});
var kitty =new Cat({name:"Zild",age:10});
kitty.save(function(err){
	if(err){
	console.log('error');	
	}else{
	console.log('success');
	}
});
}