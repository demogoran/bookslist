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
        let sumStats={
            passed: 0,
            total: 0
        }
        for(let subcategory in e[category]){
            let data=Object.keys(e[category][subcategory]).find(x=>x.startsWith('C++'));
            if(data){
                let value=e[category][subcategory][data];
                sumStats.passed+=value.passed;
                sumStats.total+=value.total;
                document.querySelector(`[data-category="${category}"] .ccontainer`).innerHTML+=`
                <div class="subcategory" data-subcategory="${subcategory}">
                    <span class="scname collapser collapsed" title="${subcategory}">${subcategory}</span>   
                    <a class="file collapsed" href="./${data}">${data}</a>
                    <div class="test collapsed">                    
                        <div class="progress">
                            <div class="done" style="width: ${value.passed/value.total*100}%;"></div>
                            <div class="desc">${value.passed} problems out of ${value.total}</div>
                        </div>
                    </div>
                </div>`;
            }
        }

        let div=document.createElement('div');
        div.classList.add('totalprogress');
        div.innerHTML=`                  
        <div class="progress">
            <div class="done" style="width: ${sumStats.passed/sumStats.total*100}%;"></div>
            <div class="desc">${sumStats.passed} problems out of ${sumStats.total}</div>
        </div>`;

        let cname=document.querySelector(`[data-category="${category}"] .cname`);
        cname.parentNode.insertBefore(div, cname.nextSibling);
    }

    Array.from(document.querySelectorAll('.cname.collapser')).forEach(x=>{
        x.addEventListener('click', ()=>{
            if(!x.classList.contains('collapsed')){
                x.classList.add('collapsed');
                x.nextElementSibling.classList.add('collapsed');
                x.nextElementSibling.nextElementSibling.classList.add('collapsed');
            }
            else{
                x.classList.remove('collapsed');                
                x.nextElementSibling.classList.remove('collapsed');
                x.nextElementSibling.nextElementSibling.classList.remove('collapsed');
            }
        });
    });
    Array.from(document.querySelectorAll('.scname.collapser')).forEach(x=>{
        x.addEventListener('click', ()=>{
            if(!x.classList.contains('collapsed')){
                x.classList.add('collapsed');
                x.nextElementSibling.classList.add('collapsed');
                x.nextElementSibling.nextElementSibling.classList.add('collapsed');
            }
            else{
                x.classList.remove('collapsed');                
                x.nextElementSibling.classList.remove('collapsed');
                x.nextElementSibling.nextElementSibling.classList.remove('collapsed');
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