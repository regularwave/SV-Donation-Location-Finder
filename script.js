var museumItems;

function itemGen() {
    (async () => {
        const getData = async () => {
            const response = await fetch("./items.json");
            const data = await response.json();
            return data;
        };

        museumItems = await getData();

        function genItemCards() {
            const donations = document.querySelector('#donations');

            for (const item of museumItems) {
                var uname = (item.Name).replace(/ /g, "_");

                var img = document.createElement('img');
                img.src = './img/' + uname + '.png';
                img.classList.add('itemimg');

                var div = document.createElement('div');
                div.id = 'itemcard';

                var checkbox = document.createElement('input');
                checkbox.type = 'checkbox';
                checkbox.classList.add('chkitem');
                checkbox.id = uname;
                checkbox.name = uname;
                checkbox.onclick = genLocationsList;

                var label = document.createElement('label');
                label.htmlFor = uname;

                var span = document.createElement('span');
                span.appendChild(document.createTextNode(item.Name));

                donations.appendChild(div);
                div.appendChild(label);
                label.appendChild(checkbox);
                label.appendChild(img);
                label.appendChild(document.createElement('br'));
                label.appendChild(span);
            }
        }

        genItemCards(museumItems);
        genLocationsList(museumItems);
        console.log(museumItems);

    })();
}

function genLocationsList() {
    document.querySelector('#locations').innerHTML = "";
    const locations = document.querySelector('#locations');
    var itemArray = [];
    var lineBuilder;

    for (const item of museumItems) {
        var uname = (item.Name).replace(/ /g, "_");
        if (document.getElementById(uname).checked) {
            // do nothing
        } else {
            for (const source of item.Sources) {
                lineBuilder = source[0] + ": " + source[1];
                itemArray.push(lineBuilder);
            }
        }
    }

    itemArray.sort();
    itemArray = [...new Set(itemArray)];
    itemArray.forEach(element => {
        span = document.createElement('span');
        locations.appendChild(span);

        span.appendChild(document.createTextNode(element));
        locations.appendChild(document.createElement('br'));
    })

}