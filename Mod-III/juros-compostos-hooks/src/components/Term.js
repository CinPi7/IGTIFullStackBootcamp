import React from 'react';

const currencyFormatter = Intl.NumberFormat('pt-BR', {
    style: 'currency', currency: 'BRL'
});

function formatCurrency(value){
    return currencyFormatter.format(value);
}

function formatPercentage(value){
    if (value){
        return `${value.toFixed(2).replace(".",".")}%`
    }
    return "";
}

export default function Term({ data }) {

    const { id, total, interest, percentage } = data;

    let classValue = interest < 0 ? "red-text" : "light-green-text";
    let classPercentage = interest < 0 ? "orange-text" : "ligth-blue-text";
    let classBold = { fontWeight: 800 }

    return (
        <div className="col s2">
            <div style={{ paddingLeft: "10px" }} className="z-depth-1">
                <div className="row card s12 m8">
                <div style={classBold} className="col">{id}</div>
                    <div className="col">
                        <div style={classBold} className={classValue}>
                            {formatCurrency(total)}
                        </div>
                        <div style={classBold} className={classValue}>
                            {formatCurrency(interest)}
                        </div>
                        <div className={classPercentage}>
                            {formatPercentage(percentage)}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
