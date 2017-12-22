<template>
    <div class="wrapper">
        <modal title="Modal title" large v-model="largeModal" @ok="submit" effect="fade/zoom">
            <div slot="modal-header" class="modal-header">
                <h4 class="modal-title">Word</h4>
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
                    <div class="row">
                        <div class="col-sm-12">
                            <div class="form-group">
                                <label for="level">Level</label>
                                <input type="number" class="form-control" id="level" v-model="item.level">
                            </div>
                        </div>
                    </div><!--/.row-->
                    <div class="row">
                        <div class="col-sm-12">
                            <multiselect 
                                v-model="item.categories"
                                v-bind:options="categories"
                                track-by="name"
                                v-bind:multiple="true"
                                v-bind:custom-label="customLabel"
                                >
                            </multiselect>
                        </div>
                    </div>
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
                            <button @click="largeModal = true; item = {}"><i class="fa fa-plus fa-2x"></i></button> Words
                        </div>
                        <div class="card-block">
                            <table class="table table-striped">
                                <thead>
                                    <tr>
                                        <th>Id</th>
                                        <th>Name</th>
                                        <th>Level</th>
                                        <th>Categories</th>
                                        <th>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr v-for="word in words">
                                        <td>{{word.id}}</td>
                                        <td>{{word.name}}</td>
                                        <td>{{word.level}}</td>
                                        <td>
                                            <span v-for="category in word.categories">{{category.name}}, </span>
                                        </td>
                                        <td>
                                            <button type="button" class="btn btn-primary" @click="largeModal = true; item = word">Edit</button>
                                            <button type="button" class="btn btn-danger" @click="dangerModal = true; item = word">Delete</button>
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
            words: [],
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
        axios.get('/api/words').then(function(res){
            data.words = res.data.data;
            data.total = res.data.total;
        });
        axios.get('/api/categories').then(function(res){
            data.categories = res.data.data;
        });
    },
    methods: {
        myCallback(page){
            let data = this;
            axios.get('/api/words?page=' + page).then(function(res){
                data.words = res.data.data;
                data.total = res.data.total;
                data.page = page;
            });
        },
        submit(){
            let data = this;
            let index;
            let tmpArr = [];
            for(index in data.item.categories){
                tmpArr.push(data.item.categories[index].id);
            }
            data.item.categories = tmpArr;
            if(data.item.id){
                axios.put('/api/words/' + data.item.id, data.item).then(function(res){
                    data.largeModal = false;
                    data.myCallback(data.page);
                });
            } else{
                axios.post('/api/words', data.item).then(function(res){
                    data.largeModal = false;
                    data.myCallback(data.page);
                });
            }
            
        },
        deleteWord(){
            let data = this;
            axios.delete('/api/words/' + data.item.id)
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