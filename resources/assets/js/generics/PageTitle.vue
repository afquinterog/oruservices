 <template>
    <div class="page-header" >

        <slot name="breadcrumb">
            
        </slot>

        <h1 class="page-title">{{title}}</h1>

        <div class="page-header-actions">
            <slot>

               
            </slot>
            <!-- <button type="button" class="btn btn-sm btn-icon btn-inverse btn-round" data-toggle="tooltip" data-original-title="Setting">
              <i class="icon wb-settings" aria-hidden="true"></i>
            </button> -->
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
