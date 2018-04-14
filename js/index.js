const run=(e)=>{
    let cleared={};
    let finalString="";

    console.log(e);
    for(let category in e){
        document.querySelector('#output').innerHTML+=`
        <div class="category" data-category="${category}">
            <span class="cname collapser">${category}</span>
            <div class="ccontainer"></div>
        </div>`
        for(let subcategory in e[category]){
            let data=Object.keys(e[category][subcategory]).find(x=>x.startsWith('C++'));
            if(data){
                let value=e[category][subcategory][data];
                document.querySelector(`[data-category="${category}"] .ccontainer`).innerHTML+=`
                <div class="subcategory" data-subcategory="${subcategory}">
                    <span class="scname collapser collapsed">${subcategory}</span>   
                    <div class="test collapsed">                    
                        <a class="file" href="./${data}">${data}</a>
                        <div class="progress">
                            <div class="done" style="width: ${value.passed/value.total*100}%;"></div>
                            <div class="desc">${value.passed} problems out of ${value.total}</div>
                        </div>
                    </div>
                </div>`;
            }
        }
    }

    Array.from(document.querySelectorAll('.collapser')).forEach(x=>{
        x.addEventListener('click', ()=>{
            if(!x.nextElementSibling.classList.contains('collapsed')){
                x.classList.add('collapsed');
                x.nextElementSibling.classList.add('collapsed');
            }
            else{
                x.classList.remove('collapsed');                
                x.nextElementSibling.classList.remove('collapsed');
            }
        });
    });
    return;
    let result=Object.keys(e).map(x=>Object.keys(e[x]).map(y=>{
        let k=Object.keys(e[x][y]).find(z=>z.startsWith('C++'));
        if(!e[x][y][k])
            return null;
        
        if(!cleared[x]){
            cleared[x]={};
            document.querySelector('#output').innerHTML+=`
            <div class="category" data-category="${x}">
                <span class="cname">${x}</span>
            </div>
            `
        }
        if(!cleared[x][y]){            
            cleared[x][y]={};
            console.log(`[data-category="${x}"]`);
            document.querySelector(`[data-category="${x}"]`).innerHTML+=`
            <div class="subcategory" data-subcategory="${y}">
                <span class="scname">${y}</span>
            </div>
            `;
        }
        
        cleared[x][y][k]=e[x][y][k];
        document.querySelector(`[data-subategory="${y}"]`).innerHTML+=`
        <div class="test" data-test="${k}">${k} ${cleared[x][y][k]}</div>
        `;

        let r={
            cat: y,
            key: k,
            value: e[x][y][k]
        };

        /* 
        document.querySelector('#output').innerHTML+=`
            <div class="container">
                <div class="category">${r.cat}</div>
                <a class="file" href="./${r.key}">${r.key}</a>
                <div class="progress">
                    <div class="done" style="width: ${r.value.passed/r.value.total*100}%;"></div>
                    <div class="desc">${r.value.passed}/${r.value.total} done</div>
                </div>
            </div>
        `; */
        return r;
    }).filter(y=>y));
}