import Square from "./Square";

export default function Matrix({ matrixSize, doOnUserMove, colorDict }) {
    const columns = new Array(matrixSize).fill(1).map((_, i) => String.fromCharCode('A'.charCodeAt(0) + i));
    const rows = new Array(matrixSize).fill(1).map((_, i) => (i + 1).toString());
    return (
        <div className='Matrix'>
            <table>
                <thead>
                    <tr>
                        <th></th>
                        {columns.map((alph) => { return (<th key={"col-" + alph}> {alph} </th>); })}
                    </tr>
                </thead>
                <tbody>
                    {
                        Array.from(Array(matrixSize)).map((_, i) => {
                            return (<tr key={"row-" + i} >
                                <td key="left-identifier"><strong>{i + 1}</strong></td>
                                {
                                    rows.map((_, j) => {
                                        const val = String.fromCharCode(j + 65) + (i + 1).toString();
                                        return (
                                            <td key={["button-", val].toString()} >
                                                <Square value={val} doOnUserMove={doOnUserMove} color={colorDict[val]} />
                                            </td>
                                        );
                                    })
                                }
                            </tr>);
                        })
                    }
                </tbody>
            </table>
        </div >
    );
}

export { Matrix };