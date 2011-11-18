pulse.ready(function() {
  var engine = new pulse.Engine({debug : true});
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
  var ballTexture = new pulse.Image({src:'../pong/ball.png'});
  
  var b;
  for(var i = 0; i < 200; i++) {
    b = new Ball({src : ballTexture});
    b.position = {
      x : Math.random() * 640,
      y : Math.random() * 480
    }; 
    world.addNode(b);
  }
  
  pulse.DebugManager.logWarning('this is a warning');
  pulse.DebugManager.logDebug('this is a bit of info');
  pulse.DebugManager.logError('this is an error!');
  pulse.DebugManager.logWarning('this is a warning');
  pulse.DebugManager.logDebug('this is a bit of info');
  pulse.DebugManager.logError('this is an error!');
  pulse.DebugManager.logWarning('this is a warning');
  pulse.DebugManager.logDebug('this is a bit of info');
  pulse.DebugManager.logError('this is an error!');
  pulse.DebugManager.logWarning('this is a warning');
  pulse.DebugManager.logDebug('this is a bit of info');
  pulse.DebugManager.logError('this is an error!');
  pulse.DebugManager.logWarning('this is a warning');
  pulse.DebugManager.logDebug('this is a bit of info');
  pulse.DebugManager.logError('this is an error!');
  pulse.DebugManager.logWarning('this is a warning');
  pulse.DebugManager.logDebug('this is a bit of info');
  pulse.DebugManager.logError('this is an error!');

  function loop(sm, elapsed)
  {
  }

  engine.go(1000/60, loop);
});