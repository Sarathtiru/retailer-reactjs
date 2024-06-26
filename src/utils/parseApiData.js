/** This function parses and converts api mock data into array of customer objects with their own transactions and returns a new Json */

export const parseApiData = (apiData) => {
  let parsedArray = [];
  for (let itm of apiData) {
    const filteredParseArray = parsedArray.filter(
      (val) => Number(val.customerId) === Number(itm.customerId)
    );

    if (filteredParseArray.length === 0) {
      parsedArray.push({
        customerId: `${itm.customerId}`,
        customerName: `${itm.customerName}`,
        transactions: [
          {
            transactionId: `${itm.transactionId}`,
            purchaseAmount: `${itm.purchaseAmount}`,
            dateOfTransaction: `${itm.dateOfTransaction}`,
          },
        ],
      });
    } else {
      parsedArray[parsedArray.indexOf(filteredParseArray[0])].transactions.push(
        {
          transactionId: `${itm.transactionId}`,
          purchaseAmount: `${itm.purchaseAmount}`,
          dateOfTransaction: `${itm.dateOfTransaction}`,
        }
      );
    }
  }

  return parsedArray;
};
