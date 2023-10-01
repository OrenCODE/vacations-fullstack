import React, {Component} from 'react';

class Footer extends Component {
    render() {
        return (
            <footer className={"bg-dark text-white p-4 text-center"}>
                Copyright &copy; {new Date().getFullYear()} VacationMaster
            </footer>
        );
    }
}

export default Footer;
