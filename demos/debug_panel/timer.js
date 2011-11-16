pulse.ready(function() {
  var engine = new pulse.Engine();
  var cybertron = new pulse.Scene({name: 'cybertron'});
  
  var world = new pulse.Layer({name: 'layer', x : 320, y : 240});
  world.zindex = 2;
  cybertron.addLayer(world);
  
  var bg = new pulse.Layer({name: 'bg', x : 320, y : 240});
  bg.zindex = 1;
  cybertron.addLayer(bg);

  engine.scenes.addScene(cybertron);
  engine.scenes.activateScene(cybertron);

  var bgs = new pulse.Sprite({
    src: '../img/gray_bg.jpg', 
    name: 'bg'
  });
  bgs.position = {x: 320, y: 240};
  
  bg.addNode(bgs);

  var greenTexture = new pulse.Image({src:'../img/green_square.png'});
  var redTexture = new pulse.Image({src:'../img/red_square.png'});
  
  var s = new pulse.Sprite({src: greenTexture});
  s.position = {x: 320, y: 240};
  world.addNode(s);
  
  var timer = new pulse.debug.Timer();
  
  function loop(sm, elapsed)
  {
    timer.mark();
    var e = timer.marks[timer.marks.length - 1];
    if(e > 30) {
      s.texture = redTexture;
    } else {
      s.texture = greenTexture;
    }
    console.log(e);
  }
  
  engine.go(16.67, loop);
  timer.start();
});