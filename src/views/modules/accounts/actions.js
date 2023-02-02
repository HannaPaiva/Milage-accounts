actions: {

    preload ({ commit }) {
        new Promise((resolve, reject) => {
            axios.get('https://milage.ualg.pt/mlv2/api/labels/EN0000/')
                .then(function ({ data }) {
                    console.log(data.labels.lines);

                    this.labels.lines = [];
                    data.labels.lines.forEach((element) => {
                        this.labels.lines.push(element);
                    });

                    resolve(data);
                })
                .catch(function (error) {
                    reject(error);
                });
        });


    }
  };
  