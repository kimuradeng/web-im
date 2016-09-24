var React = require("react");

var ChangeGroupSubject = require("../group/changeGroupSubject");
var ChangeGroupDescription = require("../group/changeGroupDescription");
var AddGroupMembers = require("../group/addGroupMembers");

module.exports = React.createClass({

    getInitialState: function () {
        var me = this;

        return {hide: 'hide'};
    },

    update: function () {
        this.setState({
            hide: this.state.hide ? '' : ' hide'
        });
    },

    addGroupMembers: function () {
        log('addGroupMembers');
        AddGroupMembers.show(this.props.roomId);
        this.update();
    },

    changeGroupSubject: function () {
        ChangeGroupSubject.show(this.props.roomId);
        this.update();
    },
    changeGroupDescription: function () {
        ChangeGroupDescription.show(this.props.roomId);
        this.update();
    },

    destroyGroup: function () {
        log('destroyGroup:' + this.props.roomId);
        if (WebIM.config.isWindowSDK) {
            //TODO:@lhr 解散群组
            WebIM.doQuery('{"type":"destroyGroup"}',
                function (response) {
                },
                function (code, msg) {
                    Notify.error("destroyGroup:" + code);
                });
        } else {
        }
        this.update();
    },

    leaveGroup: function () {
        log('leaveGroup:' + this.props.roomId);
        if (WebIM.config.isWindowSDK) {
            //TODO:@lhr 退出群组
            WebIM.doQuery('{"type":"leaveGroup"}',
                function (response) {
                },
                function (code, msg) {
                    Notify.error("leaveGroup:" + code);
                });
        } else {
        }
        this.update();
    },


    render: function () {
        var className = this.state.hide ? ' ' + this.state.hide : '';
        //var acttionName = (this.props.admin == 1) ? Demo.lan.destroyGroup : Demo.lan.leaveGroup;
        //var actionMethod = (this.props.admin == 1) ? this.destroyGroup : this.leaveGroup;
        /*
         <li onClick={actionMethod}>
         <i className='font smallest'>Q</i>
         <span>{acttionName}</span>
         </li>
         * */
        return (
            <div>
                <i className='webim-operations-icon font xsmaller' onClick={this.update}>M</i>
                <ul className={'webim-operations' + className}>
                    <li onClick={this.addGroupMembers}>
                        <i className='font smallest'>F</i>
                        <span>{Demo.lan.addGroupMembers}</span>
                    </li>
                    <li onClick={this.changeGroupSubject}>
                        <i className='font smallest'>B</i>
                        <span>{Demo.lan.changeGroupSubject}</span>
                    </li>
                    <li onClick={this.changeGroupDescription}>
                        <i className='font smallest'>B</i>
                        <span>{Demo.lan.changeGroupDescription}</span>
                    </li>
                    <li onClick={this.destroyGroup}>
                        <i className='font smallest'>Q</i>
                        <span>{Demo.lan.destroyGroup}</span>
                    </li>
                    <li onClick={this.leaveGroup}>
                        <i className='font smallest'>Q</i>
                        <span>{Demo.lan.leaveGroup}</span>
                    </li>
                </ul>
            </div>
        );
    }
});