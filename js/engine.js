(function(root){
'use strict';
const SIZE=18;
const directions={up:{x:0,y:-1},down:{x:0,y:1},left:{x:-1,y:0},right:{x:1,y:0}};
function foodFor(snake,random=Math.random){const free=[];for(let y=1;y<=SIZE;y++)for(let x=1;x<=SIZE;x++)if(!snake.some(p=>p.x===x&&p.y===y))free.push({x,y});return free.length?free[Math.floor(random()*free.length)]:null;}
function create(){const snake=[{x:9,y:10},{x:8,y:10},{x:7,y:10}];return {snake,direction:directions.right,pending:null,food:foodFor(snake),score:0,status:'ready'};}
function turn(state,name){const next=directions[name];if(state.status!=='playing'||!next||state.pending)return;if(next.x===-state.direction.x&&next.y===-state.direction.y)return;state.pending=next;}
function step(state){if(state.status!=='playing')return;const dir=state.pending||state.direction;state.pending=null;state.direction=dir;const head={x:state.snake[0].x+dir.x,y:state.snake[0].y+dir.y};const eating=head.x===state.food.x&&head.y===state.food.y;const body=eating?state.snake:state.snake.slice(0,-1);if(head.x<1||head.x>SIZE||head.y<1||head.y>SIZE||body.some(p=>p.x===head.x&&p.y===head.y)){state.status='over';return;}state.snake.unshift(head);if(eating){state.score++;state.food=foodFor(state.snake);if(!state.food)state.status='won';}else state.snake.pop();}
const api={SIZE,directions,foodFor,create,turn,step};if(typeof module!=='undefined'&&module.exports)module.exports=api;else root.BooEngine=api;
})(globalThis);
