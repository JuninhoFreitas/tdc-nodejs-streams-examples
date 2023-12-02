# Use 'cat' para exibir o conteúdo do arquivo de log
# e 'grep' para filtrar apenas as linhas relacionadas à rota desejada.
cat access.log | grep "/api/recurso" |

# Use 'awk' para extrair o endereço IP da linha de log
# e 'sort' para classificar os endereços IP.
awk '{print $1}' | sort |

# Use 'uniq -c' para contar o número de ocorrências de cada endereço IP.
uniq -c |

# Classifique novamente para que os resultados sejam exibidos do maior para o menor.
sort -rn