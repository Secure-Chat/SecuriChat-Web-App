import {Paper, Typography } from '@mui/material';

export default function Footer() {
    return (
        <Paper>
            <Typography>
        <footer className="footer nav-bg--color">
            <div className="container text-center">
                {/* We should add an about page link here */}
                <span className="text-muted">SecuriChat © 2022</span>
            </div>
        </footer>
            </Typography>
        </Paper>
    )
}