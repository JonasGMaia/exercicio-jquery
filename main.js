$(document).ready(function(){
    
    $(document).on('click','.tarefa', function() {
        $(this).toggleClass('cortado');
    });

    $(document).on('keypress','#pesquisa', function(e){
        if (e.which === 13){
            e.preventDefault();
        }
    });

    $(document).on('input', '#pesquisa', function(){
        const inputPesquisa = $('#pesquisa').val().toLowerCase();
        $('#lista li').each(function(){
            const liLista = $(this).text().toLowerCase();
            if(liLista.includes(inputPesquisa)) {
                $(this).show();
            }
            else{
                $(this).hide();
            }

        })
    });


    $('#entrada').on('submit', function(e) {
        e.preventDefault();
        const novaTarefa = $('#nova_tarefa').val();
        const novoItem = $('<li></li>');
        $(`
            <input class="seletor" type="checkbox">
            <button class="editar" title="Editar"><img src="https://th.bing.com/th/id/OIP.Hne6MeQQuYlMCPEL3eBSQgHaHa?w=167&h=180&c=7&r=0&o=5&pid=1.7" alt="Editar"></button>
            <div class="tarefa" title="Clique na tarefa para marcá-la como feita"><p> ${novaTarefa} </p></div>
        `).appendTo(novoItem);
        $(novoItem).appendTo('ol')
        $('#nova_tarefa').val('');
        const divLista = $('#lista');
        divLista.scrollTop(divLista[0].scrollHeight);
    

        
    $(document).on('change','.seletor',function() {
        if ($('.seletor').is(':checked')) {
            $('#controle').slideDown();
        } else {
            $('#controle').hide();
        }
    });

    $(document).on('click', '.editar', function() {
        var itemListado = $(this).siblings('.tarefa');
        var conteudoAtual = itemListado.text();
        if (itemListado.find('input').length === 0) {
            var $input = $('<input type="text" />').val(conteudoAtual);
            itemListado.html($input);
            $input.focus();
            $input.on('keypress', function(e) {
                if (e.which === 13) {
                    salvarEdicao(itemListado, $input.val());
        }});
                $input.on('blur', function() {
                    salvarEdicao(itemListado, $input.val());
                });
        }
        });
        function salvarEdicao($item, novoConteudo) {
            $item.html(novoConteudo);
        }
            });

    $(document).on('click', '#selecionarTudo', function(){
        var todasMarcadas = $('.seletor:checked').length === $('.seletor').length;
        $('.seletor').prop('checked', !todasMarcadas);
    });

    $(document).on('click', '#excluir', function(){
        $('.seletor:checked').each(function(){
            $(this).parent().remove();
        })
    });

});