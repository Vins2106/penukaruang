let mu1 = getDocById("matauang1");
let mu2 = getDocById("matauang2");
let jumlah = getDocById("jumlah");
let tombol = getDocById("tombol");
let loading = getDocById("loading");
let load = getQSAll("#load");
let waktu = getDocById("waktu");
let hitungan = getDocById("hitungan");
waktu.style.display = "none";

fetch("https://api-exchange-rates.herokuapp.com/list-currency", {
	method: "GET"
}).then(res => res.json()).then(res => {
	res.data.results.map(x => {
		let muO1 = document.createElement("option");
		setAttrTo(muO1, "value", x.currCode);
		muO1.innerHTML = `${x.currCode} - ${x.currName}`

		if (x.currCode == "IDR") {
			setAttrTo(muO1, "selected", "true")
		}

		mu1.appendChild(muO1);

		let muO2 = document.createElement("option");
		setAttrTo(muO2, "value", x.currCode);
		muO2.innerHTML = `${x.currCode} - ${x.currName}`

		if (x.currCode == "USD") {
			setAttrTo(muO2, "selected", "true")
		}

		mu2.appendChild(muO2);

		tombol.disabled = false;
	})

	loading.style.display = "none";
	for (let i = 0; i < load.length; i++) {
		load[i].style.display = "block"
	}	
})

function tukarMataUang() {
	let mu12 = getDocById("matauang1");
	let mu22 = getDocById("matauang2");
	let jumlah2 = getDocById("jumlah")

	fetch(`http://api-exchange-rates.herokuapp.com/calculator?from=${mu12.value}&to=${mu22.value}&amount=${jumlah2.value}`)
	.then(res => res.json())
	.then(res => {
		getDocById("hasil").value = res.data.toResult;
	})
}

let sudahPernah = localStorage.getItem("acc")
alertUser()

function alertUser() {
	if (sudahPernah) return;

	waktu.style.display = "block";

	localStorage.setItem("acc", true);

	let time = 9;

	document.title = "Perhatian!!!"

	let a = setInterval(() => {
		hitungan.innerHTML = time;
		time -= 1;
	}, 1000)

	setTimeout(() => {
		document.title = "Penukar mata uang online"
		waktu.style.display = "none"
	    clearInterval(a);
	}, 10000)

}