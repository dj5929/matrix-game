export default function Scoreboard({ userScore, oppScore }) {
    return (
        <div className="Scoreboard">
            <table>
                <thead>
                    <tr>
                        <th> Your Score </th>
                        <th> Opponent Score </th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>{userScore}</td>
                        <td>{oppScore}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
}