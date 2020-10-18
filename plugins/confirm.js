$.confirm = function (options) {
    return new Promise((resolve, reject) => {
        const modal = $.modal({
            title: options.title,
            width: '400px',
            content: options.content,
            closable: false,
            onClose() {
              modal.destroy();
            },
            footerButtons: [
                {
                    text: 'Yes',
                    type: 'danger',
                    handler() {
                        console.log('Delete');
                        modal.close();
                        resolve();

                    }
                },
                {
                    text: 'No',
                    type: 'primary',
                    handler() {
                        console.log('NOT Delete');
                        modal.close();
                        reject();
                    }
                }
            ]
        });
        setTimeout(() => modal.open(), 100);
    })
}
