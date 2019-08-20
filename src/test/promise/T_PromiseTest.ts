class Chef {

    public isWish: boolean = false;

    public wishThings() {
        this.isWish = true;
        return new Promise(function (reslove, reject) {
            setTimeout(() => {

            }, 1000);
        });
    }


}
