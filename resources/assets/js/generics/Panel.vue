 <template>
    <div class="panel panel-bordered" >
        <div class="panel-heading">
            <h3 class="panel-title">{{title}}</h3>
            <slot name="actions"></slot>
        </div>
        <div class="panel-body container-fluid">
            <slot></slot>
        </div>
    </div>
</template>

<script>
    export default {
        props: ['title'],
        mounted() {
        }
    }
</script>
