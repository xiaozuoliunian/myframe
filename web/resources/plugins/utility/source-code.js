'use strict';

/*显示页面元素的源代码*/

var SourceCode = function() {

    var runDemoSourceCode = function() {

        var bsElement = $(".bs-component");

        if (bsElement.length) {

            // allow caching of demo resources
            $.ajaxSetup({
                cache: true
            });

            // Define Source code modal
            var modalSource = '<div class="modal fade" id="source-modal" tabindex="-1" role="dialog">  ' +
                '<div class="modal-dialog modal-lg"> ' +
                '<div class="modal-content" > ' +
                '<div class="modal-header"> ' +
                '<button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button> ' +
                '<h4 class="modal-title" id="myModalLabel">源代码</h4> ' +
                '</div> ' +
                '<div class="modal-body"> ' +
                '<div style="max-height:300px; overflow: auto;" data-always-visible="1" data-rail-visible1="1"> ' +
                '<div class="highlight"> ' +
                '<pre> ' +
                '<code class="language-html" data-lang="html"></code> ' +
                '</pre> ' +
                '</div> </div> </div> </div> </div> </div> </div>';


            // Append modal to body
            $(modalSource).appendTo('body');

            // Code btn definition
            var codeBtn = $("<div id='source-button' class='btn btn-primary btn-xs'>&lt; &gt;</div>")
            codeBtn.click(function() {
                var html = $(this).parent().html();
                html = cleanSource(html);
                $("#source-modal pre").text(html);
                $("#source-modal").modal();

                // Init Highlight.js plugin after delay
                var source = $("#source-modal").find('pre');
               
                // Highlight code text on click
                $('.btn-clipboard').on('click', function() {
                    var selection = $(this).parents('.modal-dialog').find('pre');
                    selection.selectText();
                });

                $(document).keypress(function(e) {
                    if (e.which == 99) {
                        console.log('go')
                        // highlight source code if user preses "c" key
                        $('.btn-clipboard').click();
                    }
                });

            });

            // Show code btn on hover
            bsElement.hover(function() {
                $(this).append(codeBtn);
                codeBtn.show();
            }, function() {
                codeBtn.hide();
            });

            // Show code modal on click
            var cleanSource = function(html) {
                var lines = html.split(/\n/);

                lines.shift();
                lines.splice(-1, 1);

                var indentSize = lines[0].length - lines[0].trim().length,
                    re = new RegExp(" {" + indentSize + "}");

                lines = lines.map(function(line) {
                    if (line.match(re)) {
                        line = line.substring(indentSize);
                    }
                    return line;
                });

                lines = lines.join("\n");
                return lines;
            }

            // Helper function to highlight code text
            jQuery.fn.selectText = function() {
                var doc = document,
                    element = this[0],
                    range, selection;
                if (doc.body.createTextRange) {
                    range = document.body.createTextRange();
                    range.moveToElementText(element);
                    range.select();
                } else if (window.getSelection) {
                    selection = window.getSelection();
                    range = document.createRange();
                    range.selectNodeContents(element);
                    selection.removeAllRanges();
                    selection.addRange(range);
                }
            };

        }

    }

    return {
        init: function() {
            runDemoSourceCode();
        }
    }
}();
