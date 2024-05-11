function run() {
  new Vue({
    el: '#details',
    data: {
      id: '',
      movie: {},
      resourcesApi: 'http://localhost:55970',
      httpBackendUrl: 'http://localhost:3000'
  
    },
    created: function () {
      let uri = window.location.search.substring(1);
      let params = new URLSearchParams(uri);
      this.id = params.get("id");
    
      axios.get(`${this.httpBackendUrl}/movies/${this.id}`).then(
          (response) => {
              this.movie = response.data;
          }
      );
    },
    methods: {

    }
  });
}

document.addEventListener('DOMContentLoaded', () => {
  run();
});
