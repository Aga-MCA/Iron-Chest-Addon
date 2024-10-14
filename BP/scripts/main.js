import{system as s,world as h,BlockTypes as u}from"@minecraft/server";function g(t){return function(...a){s.run(()=>t(...a))}}var d={"aga_iron_chest:dirt_chest":{level:0,name:"dirt_chest"},"aga_iron_chest:copper_chest":{level:1,name:"copper_chest"},"aga_iron_chest:iron_chest":{level:2,name:"iron_chest"},"aga_iron_chest:golden_chest":{level:3,name:"golden_chest"},"aga_iron_chest:diamond_chest":{level:4,name:"diamond_chest"},"aga_iron_chest:crystal_chest":{level:4,name:"crystal_chest"},"aga_iron_chest:obsidian_chest":{level:4,name:"obsidian_chest"},"aga_iron_chest:netherite_chest":{level:5,name:"netherite_chest"}},y={"aga_iron_chest:wood_to_iron_chest_upgrade":{from:"minecraft:chest",to:"aga_iron_chest:iron_chest"},"aga_iron_chest:wood_to_copper_chest_upgrade":{from:"minecraft:chest",to:"aga_iron_chest:copper_chest"},"aga_iron_chest:copper_to_iron_chest_upgrade":{from:"aga_iron_chest:copper_chest",to:"aga_iron_chest:iron_chest"},"aga_iron_chest:iron_to_gold_chest_upgrade":{from:"aga_iron_chest:iron_chest",to:"aga_iron_chest:golden_chest"},"aga_iron_chest:gold_to_diamond_chest_upgrade":{from:"aga_iron_chest:golden_chest",to:"aga_iron_chest:diamond_chest"},"aga_iron_chest:diamond_to_crystal_chest_upgrade":{from:"aga_iron_chest:diamond_chest",to:"aga_iron_chest:crystal_chest"},"aga_iron_chest:diamond_to_obsidian_chest_upgrade":{from:"aga_iron_chest:diamond_chest",to:"aga_iron_chest:obsidian_chest"},"aga_iron_chest:diamond_to_netherite_chest_upgrade":{from:"aga_iron_chest:diamond_chest",to:"aga_iron_chest:netherite_chest"}};function m(t){let a=d[t.typeId];if(!a)return;let e=t.dimension.getEntitiesAtBlockLocation(t).find(o=>o.typeId=="aga_iron_chest:iron_chest");if(e)return e;let n=t.dimension.spawnEntity("aga_iron_chest:iron_chest",{x:t.x+.5,y:t.y,z:t.z+.5});return n.triggerEvent(`aga_iron_chest_${a.level}`),n.nameTag=a.name,n}function l(t){d[t.typeId]&&t.dimension.getEntitiesAtBlockLocation(t).forEach(g(e=>{if(e.typeId==="aga_iron_chest:iron_chest"){let n=e.getComponent("inventory").container;for(let o=0;o<n.size;o++){let i=n.getItem(o);i&&t.dimension.spawnItem(i,t)}e.remove()}}))}h.beforeEvents.playerBreakBlock.subscribe(t=>{l(t.block)});h.beforeEvents.explosion.subscribe(t=>{t.getImpactedBlocks().forEach(l)});function k(t){return t.typeId=="minecraft:chest"?t.getComponent("inventory")?.container:t.dimension.getEntitiesAtBlockLocation(t).find(a=>a.typeId=="aga_iron_chest:iron_chest")?.getComponent("inventory")?.container}h.beforeEvents.worldInitialize.subscribe(({blockComponentRegistry:t,itemComponentRegistry:a})=>{t.registerCustomComponent("aga_iron_chest:chest",{onPlayerInteract(e){if(e.block.permutation.getState("frame:open")==0){let o=s.runInterval(()=>{let i=e.block.permutation.getState("frame:open");i<5?e.block.setPermutation(e.block.permutation.withState("frame:open",i+1)):(s.clearRun(o),e.dimension.playSound("random.chestopen",e.block,{volume:.7}))},0)}else if(e.block.permutation.getState("frame:open")==5){let o=s.runInterval(()=>{let i=e.block.permutation.getState("frame:open");i>0?e.block.setPermutation(e.block.permutation.withState("frame:open",i-1)):(s.clearRun(o),e.dimension.playSound("random.chestclosed",e.block,{volume:.7}))},0)}},onPlace(e){m(e.block)}}),t.registerCustomComponent("aga_iron_chest:chest_open",{onRandomTick(e){let n=s.runInterval(()=>{let o=e.block.permutation.getState("frame:open");o>0?e.block.setPermutation(e.block.permutation.withState("frame:open",o-1)):(s.clearRun(n),e.dimension.playSound("random.chestclosed",e.block,{volume:.7}))},0)},onTick(e){let n=m(e.block);n&&n.getEffect("regeneration")?.duration<2&&n.addEffect("regeneration",255,{amplifier:10,showParticles:!1})}}),a.registerCustomComponent("aga_iron_chest:upgrade",{async onUseOn(e){let n=y[e.itemStack.typeId];if(!n||e.block.typeId!=n.from)return;let o=u.get(n.to);if(!o)return;let i=k(e.block),r=m({typeId:n.to,dimension:e.block.dimension,x:e.block.x,y:e.block.y,z:e.block.z});await s.waitTicks(1);let p=r?.getComponent("inventory")?.container;for(let c=0;c<27;c++)i?.moveItem(c,c,p);let f=e.block.permutation.getState("minecraft:cardinal_direction");e.block.setType(o),e.block.setPermutation(e.block.permutation.withState("minecraft:cardinal_direction",f));let _=d[e.block.typeId];_&&(r.triggerEvent(`aga_iron_chest_${_.level}`),r.nameTag=_.name)}})});
