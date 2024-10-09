import app from '@server/server';
import 'dotenv/config';


const port = process.env.PORT ?? 5011

app.listen(port,()=>{
    console.log(`Server running at http://localhost:${port}`);
    
})