<template>
   <div class="form-group row"  :class="{ 'has-danger': hasError }">
        <label class="col-xs-12 col-md-3 form-control-label">{{label}}: </label>
        <div class="col-md-9 col-xs-12">
        <slot>
            <!-- Input element -->
        </slot>
        <small v-if="hasError" class="text-help" data-fv-for="name" style="">{{errorMsg}}</small>
      </div>
    </div>
</template>

<script>
    export default {
        props : ["hasError", "label", "errorMsg"],

        mounted() {
            console.log('form input ...');
        }
    }
</script>
