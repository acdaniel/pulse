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

  var l = new pulse.CanvasLabel();
  l.anchor = {x : 0, y : 1};
  l.position = {x : 10, y : 470};
  l.text = "FPS: 0";
  world.addNode(l);
  
  var counter = new pulse.debug.DebugCounter();
  
  function loop(sm, elapsed)
  {
    counter.increment();
    l.text = "Updates: " + counter.count;
  }
  
  engine.go(1000/60, loop);
});