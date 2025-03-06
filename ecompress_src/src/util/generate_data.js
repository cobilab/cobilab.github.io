import formulas from '../formulas.json';
import groups from '../formulas2.json';

let models = []

export function load_models() {

    if (models.length > 0) {
        return;
    }
    
    models = [];

    for (let group of groups) {
        let model = {
            "name": group.id,
            "formulas": []
        }
        for (let formula of group.models) {
            // Transform the formula to include the data object
            formula.dependent_variables.map((variable, index) => {
                if (!formula.normal_model.includes(`data.${variable}`)){
                    formula.normal_model = formula.normal_model.replaceAll(variable, `data.${variable}`);
                }
                if ("compressed_model" in formula && !formula.compressed_model.includes(`data.${variable}`)) {
                    formula.compressed_model = formula.compressed_model.replaceAll(variable, `data.${variable}`);
                }
            });

            model.formulas.push({
                "name": formula.name,
                "dependent_variables": formula.dependent_variables,
                "normal_model": new Function(...formula.independent_variables, 'data', `return ${formula.normal_model}`),
                "compressed_model": new Function(...formula.independent_variables, 'data', `return ${"compressed_model" in formula ? formula.compressed_model : formula.normal_model}`)
            });
        }
        models.push(model);
    }
}


export function calculate_model(data, nDataPoints=20, stepSize=100, customDin=[]) {
    if (!data) {
        return null;
    }

    let series = [];
    for (let data_size = 0; data_size < nDataPoints*stepSize; data_size += stepSize) {
        
        let useful_data_size = data_size;

        // Iterate over models 
        let element = {
            "total": {
                "normal_value": 0,
                "compressed_value": 0,
                "xaxis": useful_data_size,
                "normal_pie": [],
                "compressed_pie": []
            }
        };
        models.forEach((model) => {
            element[model.name] = {
                "normal_value": 0,
                "compressed_value": 0,
                "xaxis": useful_data_size,
                "normal_pie": [],
                "compressed_pie": []
            };
        });

        for (let model of models) {
            for (let formula of model.formulas) {
                if (formula.dependent_variables.some((variable, index) => data.disabled.includes(variable))) {
                    continue;
                }

                let normal_value = Math.round((formula.normal_model(useful_data_size, data) + Number.EPSILON)*100)/100;
                let compressed_value = Math.round((formula.compressed_model(useful_data_size, data)+ Number.EPSILON)*100)/100;
            

                if (model.name === "download" && isNaN(compressed_value)) {
                    console.log("DOWNLOAD")
                    console.log(useful_data_size, data)
                }


                element[model.name].normal_value += normal_value;
                element[model.name].compressed_value += compressed_value;
                element[model.name].normal_pie.push({
                    "label": formula.name,
                    "value":normal_value
                });
                element[model.name].compressed_pie.push({
                    "label": formula.name,
                    "value": compressed_value
                });

                if (!customDin) {
                    // Skip
                }
                else if (customDin[0].lock && model.name !== "download") {
                    normal_value = Math.round((formula.normal_model(customDin[0].value, data) + Number.EPSILON)*100)/100;
                    compressed_value = Math.round((formula.compressed_model(customDin[0].value, data)+ Number.EPSILON)*100)/100;
                }
                else if (customDin[1].lock && model.name === "download") {
                    normal_value = Math.round((formula.normal_model(customDin[1].value, data) + Number.EPSILON)*100)/100;
                    compressed_value = Math.round((formula.compressed_model(customDin[1].value, data)+ Number.EPSILON)*100)/100;
                }
                else if (customDin[2].lock) {
                    if (model.name === "download") {
                        normal_value = Math.round((formula.normal_model(useful_data_size/customDin[2].value, data) + Number.EPSILON)*100)/100;
                        compressed_value = Math.round((formula.compressed_model(useful_data_size/customDin[2].value, data)+ Number.EPSILON)*100)/100;
                    }
                }


                element.total.normal_value += normal_value;
                element.total.compressed_value += compressed_value;
                element.total.normal_pie.push({
                    "label": formula.name,
                    "value": normal_value
                });
                element.total.compressed_pie.push({
                    "label": formula.name,
                    "value": compressed_value
                });
            }
        }
        series.push(element);
    }


    return series;
}
