        let header = document.getElementById("header");
        let demo = document.getElementById("demo");
        let inputs = document.querySelectorAll("input");
        let numbers = [
            "050-222-50-00", "050-666-60-00", "050-333-70-00", "050-244-50-00", "050-244-61-11", "050-244-72-22",
            "050-444-54-44", "050-555-05-55", "050-666-16-66", "050-222-20-00", "050-333-30-00", "050-224-50-00",
            "050-663-60-00", "050-331-70-00", "050-222-22-00", "050-222-10-00", "050-333-80-00", "050-444-40-00",
            "050-555-30-00", "050-666-50-00", "050-333-90-00", "050-244-11-11", "050-244-33-33", "050-244-44-44",
            "050-222-55-00", "050-333-60-00", "050-444-10-00", "050-555-20-00", "050-666-30-00", "050-222-60-00",
            "050-333-70-00", "050-444-30-00", "050-555-40-00", "050-666-20-00", "050-333-50-00", "050-244-77-77",
            "050-222-80-00", "050-333-00-00", "050-444-20-00", "050-555-10-00", "050-666-60-00", "050-333-20-00",
            "050-244-55-55", "050-222-10-00", "050-444-11-11", "050-555-60-00", "050-666-40-00", "051-222-50-00",
            "051-333-60-00", "051-444-10-00", "051-555-40-00", "070-222-50-00", "070-333-20-00", "070-444-30-00",
            "070-555-50-00", "077-222-10-00", "077-333-00-00", "077-444-70-00", "077-555-60-00", "099-222-40-00",
            "099-333-10-00", "099-444-20-00", "099-555-30-00"
        ];

        let newNumbers = numbers.map((item) => item.split("-").join(""));
        let headers = [];
        numbers.map((item) => item.slice(0, 3))
            .filter((item) => {
                if (!headers.includes(item)) headers.push(item);
            });

        headers.forEach(item => {
            header.innerHTML += `<option value="${item}">${item}</option>`;
        });

        function searchNumber() {
            let selectedHeaders = newNumbers.filter((item) => item.slice(0, 3) == header.value);
            let nomreler = [];
            let ulduzlar = [];
            let count = 0;

            inputs.forEach(function (input, index) {
                let isNumber = true;
                for (let i = 0; i < input.value.length; i++) {
                    if (input.value[i] < "0" || input.value[i] > "9") {
                        isNumber = false;
                    }
                }
                if (!isNumber && input.value !== "*") {
                    alert("Yalnız rəqəm(0-9) və * simvolu daxil edə bilərsiniz!");
                    input.value = '';
                    return;
                }
                if (input.value) {
                    if (input.value !== "*") {
                        count++;
                        if (nomreler.length == 0) {
                            nomreler = selectedHeaders.filter((item) => item[index + 3] == input.value);
                        } else {
                            nomreler = nomreler.filter((item) => item[index + 3] == input.value);
                        }
                    } else {
                        ulduzlar.push(index + 3);
                    }
                }
            });

            if (count < 3) {
                alert('Ən azı 3 xanaya rəqəm yazılmalıdır');
            } else {
                let ulduz = ulduzlar[0];
                for (let i = 0; i < ulduzlar.length; i++) {
                    nomreler = nomreler.filter(item => item[ulduzlar[i]] == item[ulduz]);
                }

                demo.innerHTML = nomreler.length
                    ? nomreler.map(item => `<p class='number'>${item}</p>`).join("")
                    : "Axtardığınız nömrə burada yoxdur";
            }
        }

        function clearNumbers() {
            demo.innerHTML = '';
            inputs.forEach(function (item) {
                item.value = '';
            });
        }