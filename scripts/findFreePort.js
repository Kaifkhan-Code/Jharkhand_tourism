const net = require('net');
const ports = Array.from({length:11}, (_,i)=>3000+i);
(async ()=>{
  for (const p of ports) {
    const used = await new Promise((res)=>{
      const srv = net.createServer();
      srv.once('error', ()=>{ res(true); });
      srv.once('listening', ()=>{ srv.close(()=>res(false)); });
      srv.listen(p, '127.0.0.1');
    });
    if (!used) { console.log(p); process.exit(0); }
  }
  console.log('none');
  process.exit(0);
})();
