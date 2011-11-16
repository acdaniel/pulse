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

  // debug stuff
  var fpstimer = new pulse.debug.FPS();
  var drawCounter = new pulse.debug.Counter();
  var nodeCounter = new pulse.debug.Counter();
  var panel = new pulse.debug.Panel({
    fpsTimer : fpstimer,
    drawCounter : drawCounter,
    nodeCounter : nodeCounter
  });
  nodeCounter.count = 2;
  
  function loop(sm, elapsed)
  { 
    drawCounter.increment();
    fpstimer.mark();
    panel.update(elapsed);
  }

  engine.go(1000/60, loop);
  fpstimer.start();
});