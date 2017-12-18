<template>
    <div class="wrapper">
        <modal title="Modal title" large v-model="largeModal" @ok="submit" effect="fade/zoom">
            <div slot="modal-header" class="modal-header">
                <h4 class="modal-title">Category</h4>
            </div>
           <div class="row">
                <div class="col-md-12">
                    <div class="row">
                        <div class="col-sm-12">
                            <div class="form-group">
                                <label for="name">Name</label>
                                <input type="text" class="form-control" id="name" placeholder="Enter name" v-model="item.name">
                            </div>
                        </div>
                    </div><!--/.row-->
               </div>
           </div>
        </modal>
        <modal title="Modal title" class="modal-danger" v-model="dangerModal" @ok="deleteWord" effect="fade/zoom">
            <div slot="modal-header" class="modal-header">
                <h4 class="modal-title">Modal title</h4>
            </div>
            <h1>delete?</h1>
        </modal>
        <div class="animated fadeIn">
            <div class="row">
                <div class="col-md-12">
                    <div class="card">
                        <div class="card-header">
                            <button @click="largeModal = true; item = {}"><i class="fa fa-plus fa-2x"></i></button> Categories
                        </div>
                        <div class="card-block">
                            <table class="table table-striped">
                                <thead>
                                    <tr>
                                        <th>Id</th>
                                        <th>Name</th>
                                        <th>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr v-for="category in categories">
                                        <td>{{category.id}}</td>
                                        <td>{{category.name}}</td>
                                        <td>
                                            <button type="button" class="btn btn-primary" @click="largeModal = true; item = category">Edit</button>
                                            <button type="button" class="btn btn-danger" @click="dangerModal = true; item = category">Delete</button>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                            <pagination :records="total" @paginate="myCallback"></pagination>
                        </div>
                    </div>
                </div><!--/.col-->
            </div><!--/.row-->
        </div>
    </div>

</template>

<script>
export default {
    name: 'tables',
    data() {
        return {
            total: 0,
            largeModal: false,
            dangerModal: false,
            categories: [],
            page: 1,
            item: {}
        };
    },
    created() {
        let data = this;
        axios.get('/api/categories').then(function(res){
            data.categories = res.data.data;
            data.total = res.data.total;
        });
    },
    methods: {
        myCallback(page){
            let data = this;
            axios.get('/api/categories?page=' + page).then(function(res){
                data.categories = res.data.data;
                data.total = res.data.total;
                data.page = page;
            });
        },
        submit(){
            let data = this;
            if(data.item.id){
                axios.put('/api/categories/' + data.item.id, data.item).then(function(res){
                    data.largeModal = false;
                    data.myCallback(data.page);
                });
            } else{
                axios.post('/api/categories', data.item).then(function(res){
                    data.largeModal = false;
                    data.myCallback(data.page);
                });
            }
            
        },
        deleteWord(){
            let data = this;
            axios.delete('/api/categories/' + data.item.id)
                .then(function(res){
                    data.dangerModal = false;
                    data.myCallback(data.page);
                });
        },
        customLabel (option) {
            return `${option.name}`
        }
    }
}
</script>
<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>