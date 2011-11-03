var textures = [];
textures.push(new PFPlay.Image({src:'../img/green_square.png'}));
textures.push(new PFPlay.Image({src:'../img/blue_square.png'}));
textures.push(new PFPlay.Image({src:'../img/red_square.png'}));

var world = new PFPlay.Layer({name: 'layer'});
world.zindex = 2;

var bg = new PFPlay.Layer({name: 'bg'});
var bgs = new PFPlay.Sprite({
  src: '../img/gray_bg.jpg', 
  name: 'bg'
});

bg.addObject(bgs);
bg.zindex = 1;

var cybertron = new PFPlay.Scene({name: 'cybertron'});

var engine = new PFPlay.Engine();

function loop(sceneManager)
{ 
  var debugTime = document.getElementById('time');
  debugTime.innerText = engine.masterTime;
}

function gameGo()
{
  var s;
  for(var i = 0; i < 9; i++) {
    s = new PFPlay.Sprite({src: textures[i%3]});
    s.anchor = {x: i % 3 * 0.5, y: Math.floor(i / 3) * 0.5};
    s.position = {x: 106 + (i % 3 * 213), y: 35 + Math.floor(i / 3) * 120};
    s.events.bind('click', function(){
      var console = document.getElementById('console');
      console.innerText = "box clicked " + Math.floor(Math.random() * 42);
    });
    world.addObject(s);
  }

  for(var j = 0; j < 4; j++) {
    s = new PFPlay.Sprite({src: textures[j%3]});
    s.anchor = {x: j % 2 * 0.5 + 0.25, y: Math.floor(j / 2) * 0.5 + 0.25};
    s.position = {x: 60 + (j % 4 * 160), y: 400};
    s.events.bind('click', function(){
      var console = document.getElementById('console');
      console.innerText = "box clicked " + Math.floor(Math.random() * 42);
    });
    world.addObject(s);
  }

  PFPlay.DEBUG = true;

  cybertron.addLayer(world);
  cybertron.addLayer(bg);
  
  engine.scenes.add(cybertron);
  engine.scenes.activate(cybertron);
  
  engine.go(16.67, loop);
}