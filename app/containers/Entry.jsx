class Entry extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const {
            CssBaseline,
            Typography,
            CardContent,
            Grid,
            Card,
        } = MaterialUI;

        return (
            <React.Fragment>
                <CssBaseline/>
                <Grid item key={this.props.title} xs={12}>
                    <Card className="card">

                        <div className="cardDetails">
                            <CardContent>
                                <Typography component="h2" variant="h5">
                                    <a href={this.props.link}>{this.props.title}</a> {this.props.date}
                                </Typography>
                                <Typography variant="subtitle1" paragraph>
                                    {this.props.content || this.props.summary}
                                </Typography>
                                {
                                    this.props.summary &&
                                    <Typography variant="subtitle1" color="primary">
                                        <a href="#">Continue reading...</a>
                                    </Typography>
                                }
                            </CardContent>
                        </div>
                    </Card>
                </Grid>
            </React.Fragment>
        );
    }
}
