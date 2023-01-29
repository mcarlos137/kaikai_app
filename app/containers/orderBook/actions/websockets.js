export var wsArray = [];

export const start = (pair, addData) => {
    Object.entries(['ASK', 'BID']).forEach(([key, value]) => {
        let ws = new WebSocket('wss://websocket.moneyclick.com/moneyMarket')
        ws.onopen = (e) => {
            console.log('Open!')
            ws.send(JSON.stringify({
                method: 'getOrderBook',
                params: {
                    pair: pair,
                    type: value,
                }
            }))
        }
        ws.onmessage = ({ data }) => {
            let dataParsed = JSON.parse(data)
            if (dataParsed.params.data.length === 0) {
                return;
            }
            let finalData = dataParsed.params.data.sort((a, b) => {
                return b.price - a.price;
            });
            if (dataParsed.params.data[0].type === 'ASK') {
                finalData = finalData.reverse();
            }
            addData(finalData)
            //indexStore.dispatch(
                //{ type: ADD_ORDER_BOOK_DATA, payload: finalData }
            //)
        }
        ws.onerror = (e) => {
            console.log('error ' + JSON.stringify(e))
        }
        ws.onclose = (e) => {
            console.log('close')
        }
        wsArray.push(ws)
    })
}

export const close = (wsArray) => {
    Object.entries(wsArray).forEach(([key, value]) => {
        value.close();
    })
    wsArray = []
}